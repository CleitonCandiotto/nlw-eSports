// 18:00 -> 1080

export function convertHoursToStringToMinutes(hourString:string){
    const [hours, minutes] = hourString.split(':').map(Number)

    const min = (hours * 60) + minutes 

    return min
}