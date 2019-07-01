
export const getStatus = (url:string): Promise<number> => {
  return new Promise( (resolve, reject ) => {
    const xhr = new XMLHttpRequest();
    xhr.open("HEAD", url, true);
    xhr.onload = () => resolve(xhr.status);
    xhr.send(null);
    xhr.onerror = () => reject();
  });
};
