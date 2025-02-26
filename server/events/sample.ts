export const timeConsumingBackgroundTask = async () => {
    await new Promise((resolve) => {
        setTimeout((): void => {
            console.log('time consuming task done')
            return resolve(true);
        }, 2000)
    });
};