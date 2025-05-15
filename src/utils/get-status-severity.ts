export const getStatusSeverity = (status: string): string => {
  if (status === 'Alive') return 'success'
  if (status === 'Dead') return 'danger'
  return 'secondary'
}
