import useSWR from "swr";

async function fetchApi(key) {
  const response = await fetch(key);
  const responseBody = await response.json();

  return responseBody;
}

function StatusPage() {
  return (
    <>
      <h1>Status</h1>
      <UpdatedAt />
      <DatabaseStatus />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  let updatedAtText = "Carregando...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }

  return (
    <p>
      <strong>Atualizado em:</strong> {updatedAtText}
    </p>
  );
}

function DatabaseStatus() {
  const { isLoading, data } = useSWR("api/v1/status", fetchApi, {
    refreshInterval: 2000,
  });

  return (
    <>
      <h2>Banco de dados: </h2>
      {!isLoading && data ? (
        <>
          <p>
            <strong>Versão:</strong> {data.dependencies.database.version}
          </p>
          <p>
            <strong>Máximo de conexões:</strong>{" "}
            {data.dependencies.database.max_connections}
          </p>
          <p>
            <strong>Conexões abertas:</strong>{" "}
            {data.dependencies.database.opened_connections}
          </p>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </>
  );
}

export default StatusPage;
