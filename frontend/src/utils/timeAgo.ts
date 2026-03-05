export default function timeAgo(createdAt: string) {
    const updated = Temporal.Instant.from(createdAt).toZonedDateTimeISO('Asia/Kolkata') //needed to use toZonedatetime iso cause largestUnit allowed other wise is just hours
    const now = Temporal.Now.instant().toZonedDateTimeISO('Asia/Kolkata')
    const diff = now.since(updated, {largestUnit:"year", smallestUnit:"minutes"})
    const rtf = new Intl.RelativeTimeFormat('en', {numeric:"auto"})
    if(diff.years > 0) return rtf.format(-diff.years, 'year')
    if(diff.months > 0) return rtf.format(-diff.months, 'month')
    if(diff.days > 0) return rtf.format(-diff.days, 'day')
    if(diff.hours > 0) return rtf.format(-diff.hours, 'hour')
    if(diff.minutes > 0) return rtf.format(-diff.minutes, 'minute')
    return 'just now'
}