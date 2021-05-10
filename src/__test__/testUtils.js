class testhelper
{
    static async waitUntil(fnWait) {
        return new Promise((resolve, reject) => {
            let count = 0;
            function check() {
                if (++count > 20) {
                    reject(new TypeError('Timeout waiting for fetch call to begin'));
                    return;
                }
                if (fnWait()) resolve();
                setTimeout(check, 10);
            }
            check();
        });
    }

    static async waitForFetch(fetchMock)
    {
        // Wait until at least one fetch() call has started.
        await this.waitUntil(() => fetchMock.called());

        // Wait until active fetch calls have completed.
        await fetchMock.flush();
    }
}

export default testhelper;