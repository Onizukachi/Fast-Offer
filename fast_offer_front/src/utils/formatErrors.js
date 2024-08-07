export const formatErrors = (title, errors) => {
  return errors.map((error) => `${title} ${error}`)
}