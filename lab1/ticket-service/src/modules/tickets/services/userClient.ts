import axios from "axios";
import { circuitBreaker } from "../../../utils/circuitBreaker";

const sleep = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getUserById = async (userId: string, correlationId: string) => {

    return circuitBreaker(async () => {

        const MAX_RETRIES = 3;

        for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {

            try {
                console.log(`Attempt ${attempt}`);

                const response = await axios.get(
                    `http://localhost:3002/api/v1/users/${userId}`,
                    {
                        timeout: 2000,
                        headers: {
                            "x-correlation-id": correlationId
                        }
                    }
                );

                return response.data;

            } catch (error: any) {

                if (attempt === MAX_RETRIES) {
                    throw new Error("User service unavailable after retries");
                }

                await sleep(500);
            }
        }
    });
};
