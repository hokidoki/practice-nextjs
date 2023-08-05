async function initMocks() {
    if (process.env.RUNNING_ENV === 'DEV') {
        if (typeof window === "undefined") {
            const { server } = await import("./server");
            server.listen({ onUnhandledRequest: "bypass" });
        } else {
            const { worker } = await import("./client");
            worker.start({ onUnhandledRequest: "bypass" });
        }
    }
}

export default initMocks;