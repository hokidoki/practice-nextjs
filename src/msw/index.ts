async function initMocks() {
    if (process.env.NEXT_PUBLIC_API_MOCKING === 'DEV') {
        if (typeof window === "undefined") {
            const { server } = await import("./server");
            server.listen({ onUnhandledRequest: "bypass" });
        } else {
            const { worker } = await import("./client");
            worker.start({ onUnhandledRequest: "bypass" });
            console.log("WORKER START")
        }
    }
}

export default initMocks;