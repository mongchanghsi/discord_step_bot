export const multiLine = (str: string) => {
  const strArray: string[] = str.split('\\n');
  let response: string = strArray[0];
  for (let i = 1; i < strArray.length; i++) {
    response += `\n ${strArray[i]}`;
  }
  return response;
};
