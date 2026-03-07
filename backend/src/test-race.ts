import axios from 'axios';

const API_URL = 'http://localhost:3000/reaction';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNtbHRjbWZtYjAwMDBidTd3cGF3dDY1MWUiLCJpYXQiOjE3NzI4MDM2Mzd9.xVfd8rZzaBlLrbt73fLvCFLjFUbZ6mmS1tFGS3luli8';
const DATA = { postId: 'cmmdrcwwq0001bus4jhcizsi8', reactionType: 'LIKE' };

async function simulateDoubleClick() {
    console.log(`🚀 [${Date.now()}] Launching simultaneous requests...`);

    const req1 = axios.post(API_URL, DATA, { headers: { Authorization: `${TOKEN}` } })
        .then(res => console.log(`[${Date.now()}] Req 1 Finished:`, res.data.message))
        .catch(err => console.log(`[${Date.now()}] Req 1 Error:`, err.response?.data?.message));

    const req2 = axios.post(API_URL, DATA, { headers: { Authorization: `${TOKEN}` } })
        .then(res => console.log(`[${Date.now()}] Req 2 Finished:`, res.data.message))
        .catch(err => console.log(`[${Date.now()}] Req 2 Error:`, err.response?.data?.message));

    await Promise.allSettled([req1, req2]);
}

simulateDoubleClick();
// FIRST RUN
// [1772826290449] Request Received: User cmltcmfmb0000bu7wpawt651e wants ANGRY - added angry here next ran script
// [1772826313254] Request Received: User cmltcmfmb0000bu7wpawt651e wants LIKE
// [1772826313255] Request Received: User cmltcmfmb0000bu7wpawt651e wants LIKE
// [1772826313256] P2002 Conflict! Starting 2s delay...
// [1772826313257] P2002 Conflict! Starting 2s delay...
// [1772826315272] Attempting DeleteMany for type: LIKE
// [1772826315273] Attempting DeleteMany for type: LIKE
// [1772826315273] No match to delete. Attempting Update to: LIKE
// [1772826315274] No match to delete. Attempting Update to: LIKE
// [1772826315274] Update Successful.
// [1772826315275] Update Successful.
// ANGRY IN DB DOING LIKE
// ran script with like in db and like in request
// Server is running on port 3000
// [1772826406377] Request Received: User cmltcmfmb0000bu7wpawt651e wants LIKE
// [1772826406402] P2002 Conflict! Starting 2s delay...
// [1772826406407] Request Received: User cmltcmfmb0000bu7wpawt651e wants LIKE        
// [1772826406410] P2002 Conflict! Starting 2s delay...
// [1772826408415] Attempting DeleteMany for type: LIKE
// [1772826408416] Attempting DeleteMany for type: LIKE
// [1772826408418] Delete Successful.
// [1772826408422] No match to delete. Attempting Update to: LIKE
// [1772826408424] Update Failed!
// ran script 3rd time after adding angry
// [1772826527217] Request Received: User cmltcmfmb0000bu7wpawt651e wants LIKE
// [1772826527217] Request Received: User cmltcmfmb0000bu7wpawt651e wants LIKE
// [1772826527219] P2002 Conflict! Starting 2s delay...
// [1772826527219] P2002 Conflict! Starting 2s delay...
// [1772826529225] Attempting DeleteMany for type: LIKE
// [1772826529226] Attempting DeleteMany for type: LIKE
// [1772826529227] No match to delete. Attempting Update to: LIKE
// [1772826529227] No match to delete. Attempting Update to: LIKE
// [1772826529228] Update Successful.
// [1772826529229] Update Successful.
// These logs are a perfect "crime scene" report of race conditions! Let’s perform the autopsy on that 3rd run. This is exactly why your database ends up in a weird state.

// ### The Autopsy of Run #3 (Angry → Like)

// You started with **Angry** in the DB. You sent two requests for **Like**.

// 1. **[...217] Dual Entry:** Both requests hit at the exact same millisecond.
// 2. **[...219] P2002 Collision:** Both try to create "Like." They both see "Angry" exists, fail, and start the 2s delay.
// 3. **[...225/226] Waking Up:** Both wake up and run `deleteMany` for "Like."
// 4. **The "Nothing to Delete" phase:** Since the DB still has "Angry," both `deleteMany` calls return `count: 0`.
// 5. **[...227] The Double Update:** Both requests move to the `update` block.
// 6. **[...228] Success 1:** Req 1 updates "Angry" to "Like."
// 7. **[...229] Success 2:** Req 2 updates "Like" to "Like" (effectively doing nothing, but reporting success).

// **The Result:** You have "Like" in the DB. Both users think they performed an action. This is "fine" for the user, but it's **wasteful** for the database because you ran two updates when only one was needed.

// ---

// ### The Autopsy of Run #2 (Like → Like)

// This one is even wilder. You started with **Like** in the DB. You sent two requests for **Like**.

// 1. **[...415] Req 1** runs `deleteMany` for "Like." It finds it!
// 2. **[...418] Req 1 Success:** It deletes the record. **The DB is now empty.**
// 3. **[...416] Req 2** runs `deleteMany` for "Like" just a millisecond later.
// 4. **[...422] Req 2 Fail:** Because Req 1 just deleted it, Req 2 finds nothing (`count: 0`). It tries to `update`.
// 5. **[...424] Update Failed!** The record is gone! Req 2 returns an error.

// **The Result:** The user clicked twice to "unlike," the first click worked, and the second click (which should have re-created the like) **failed and showed an error.**

// ---

// ### Why a Transaction is the "Vaccine"

// If you wrap this in a **Transaction**, the following happens:

// 1. **Req 1** enters the transaction and "locks" the record.
// 2. **Req 2** hits the transaction and is **forced to wait**.
// 3. **Req 1** finishes its entire logic (Create, or Delete, or Update) and **commits**.
// 4. **Req 2** is finally allowed to start. It now sees the **fresh** state of the DB that Req 1 left behind.

// **With a Transaction, Run #2 would look like this:**

// * **Req 1:** Sees "Like," deletes it. (DB Empty).
// * **Req 2:** Now starts. It tries to create "Like." **Since the DB is empty, it succeeds!** (DB has "Like").
// * **Final Result:** The toggle worked perfectly (On $\rightarrow$ Off $\rightarrow$ On).

// ### Final Verdict

// Your logs prove that without transactions, your logic is **"State Blind."** Requests are making decisions based on what the DB looked like 2 seconds ago, not what it looks like *now*.
//code to reproduce
// app.post('/reaction', authenticateToken, async (req: modRequest, res: Response) => {
//     const start = Date.now();
//     const { postId, reactionType: type } = req.body;
//     const { id: userId } = req.user!;
    
//     console.log(`[${start}] Request Received: User ${userId} wants ${type}`);

//     try {
//         const reaction = await prisma.Reaction.create({
//             data: { userId, postId, type }
//         });
//         return res.status(200).json({ message: "reaction created", body: { reaction } });
//     } catch (e) {
//         if (e instanceof Prisma.PrismaClientKnownRequestError && e.code === "P2002") {
//             const conflictTime = Date.now();
//             console.log(`[${conflictTime}] P2002 Conflict! Starting 2s delay...`);
            
//             // --- THE DELAY ---
//             await new Promise(resolve => setTimeout(resolve, 2000)); 
            
//             try {
//                 const deleteStart = Date.now();
//                 console.log(`[${deleteStart}] Attempting DeleteMany for type: ${type}`);
                
//                 const { count } = await prisma.Reaction.deleteMany({
//                     where: { userId, postId, type }
//                 });

//                 if (count === 1) {
//                     console.log(`[${Date.now()}] Delete Successful.`);
//                     return res.status(200).json({ message: "deleted" });
//                 }

//                 if (count === 0) {
//                     const updateStart = Date.now();
//                     console.log(`[${updateStart}] No match to delete. Attempting Update to: ${type}`);
                    
//                     try {
//                         const updated = await prisma.Reaction.update({
//                             where: { reactionId: { userId, postId } },
//                             data: { type }
//                         });
//                         console.log(`[${Date.now()}] Update Successful.`);
//                         return res.status(200).json({ message: "updated", body: { updated } });
//                     } catch (updateErr) {
//                         console.log(`[${Date.now()}] Update Failed!`);
//                         return res.status(200).json({ message: "failed updation" });
//                     }
//                 }
//             } catch (deleteErr) {
//                 return res.status(200).json({ message: "failed deletion" });
//             }
//         }
        
//         // Prevent double response if headers already sent
//         if (!res.headersSent) {
//             res.status(500).json({ message: "etf", error: e });
//         }
//     }
// });

// app.post('/reaction', authenticateToken, async (req: modRequest, res: Response) => {
//     const { postId, reactionType: type } = req.body;
//     const { id: userId } = req.user!;

//     try {
//         // All DB operations inside this block are now Atomic
//         const result = await prisma.$transaction(async (tx) => {
//             try {
//                 const reaction = await tx.reaction.create({
//                     data: { userId, postId, type }
//                 });
//                 return { status: 200, message: "reaction created", body: { reaction } };
//             } catch (e: any) {
//                 // If record exists, P2002 is thrown
//                 if (e.code === "P2002") {
//                     // 1. Try to delete (Toggle off)
//                     const { count } = await tx.reaction.deleteMany({
//                         where: { userId, postId, type }
//                     });

//                     if (count === 1) {
//                         return { status: 200, message: "deleted" };
//                     }

//                     // 2. If nothing was deleted, it's a different type, so update
//                     if (count === 0) {
//                         const updated = await tx.reaction.update({
//                             where: {
//                                 userId_postId: { userId, postId }
//                             },
//                             data: { type }
//                         });
//                         return { status: 200, message: "updated", body: { updated } };
//                     }
//                 }
//                 throw e; // Crash the transaction if it's a different error
//             }
//         }, {
//             // Optional: Increase isolation level if your DB supports it
//             // isolationLevel: Prisma.TransactionIsolationLevel.Serializable 
//         });

//         // The transaction returned our object, now we send it to the client
//         return res.status(result.status).json({
//             message: result.message,
//             body: result.body
//         });

//     } catch (e: any) {
//         console.error("Transaction failed:", e.message);
//         return res.status(500).json({
//             message: "Something went wrong",
//             error: e.message
//         });
//     }
// });

// λ npx tsx test-race.ts
// 🚀 [1772899322608] Launching simultaneous requests...
// [1772899322814] Req 1 Finished: reaction created
// [1772899322830] Req 2 Finished: reaction deleted

// C:\Users\afazp\OneDrive\Documents\GitHub\social\backend\src (feature/Normalize-State-and-Implement-Post-Reactivity -> origin)
// λ npx tsx test-race.ts
// 🚀 [1772899400491] Launching simultaneous requests...
// [1772899400528] Req 2 Finished: reaction deleted
// [1772899400555] Req 1 Error: Something went wrong