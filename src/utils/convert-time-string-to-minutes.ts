export function covertTimeStringToMinutes(time: string) {
  const [hours, minutes] = time.split(':').map((item) => Number(item))

  return (hours * 60) + minutes
}