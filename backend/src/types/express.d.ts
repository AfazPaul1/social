//declaration merging
declare global {
    namespace Express {
        export interface Request {
            user?: {
                id:string,
                role: "USER" | "MODERATOR" | "ADMIN"
            }
        }
    }
}
//this aint working
//when i do it locally by extending Request it works