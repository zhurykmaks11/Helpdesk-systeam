let failureCount = 0;
let successCount = 0;

let state: "CLOSED" | "OPEN" | "HALF_OPEN" = "CLOSED";

const FAILURE_THRESHOLD = 3;
const SUCCESS_THRESHOLD = 2;
const TIMEOUT = 5000; // 5 сек

let nextTry = Date.now();

export const circuitBreaker = async (action: Function) => {

    if (state === "OPEN") {

        if (Date.now() > nextTry) {
            state = "HALF_OPEN";
        } else {
            throw new Error("Circuit breaker is OPEN");
        }
    }

    try {
        const result = await action();

        if (state === "HALF_OPEN") {
            successCount++;

            if (successCount >= SUCCESS_THRESHOLD) {
                state = "CLOSED";
                failureCount = 0;
                successCount = 0;
            }
        }

        return result;

    } catch (error) {

        failureCount++;

        if (failureCount >= FAILURE_THRESHOLD) {
            state = "OPEN";
            nextTry = Date.now() + TIMEOUT;
        }

        throw error;
    }
};