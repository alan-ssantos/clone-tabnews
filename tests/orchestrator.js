import retry from "async-retry";

async function waitForAllServices() {
  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
      onRetry: (e, attempt) => {
        console.log(
          `Attempt ${attempt} - Failed to fetch status page ${e.message}`,
        );
      },
    });

    async function fetchStatusPage() {
      const response = await fetch("http://localhost:3000/api/v1/status");
      if (response.status !== 200) {
        throw Error(`HTTP Error ${response.status}`);
      }
    }
  }

  await waitForWebServer();
}

const orchestrator = {
  waitForAllServices,
};

export default orchestrator;
