const { exec } = require("node:child_process");

function checkPostgres() {
  exec("docker exec postgres_dev pg_isready --host localhost", handleReturn);

  function handleReturn(error, stdout) {
    if (stdout.search("accepting connections") === -1) {
      process.stdout.write(".");
      checkPostgres();
      return;
    }

    process.stdout.write("\n🟢 O Postgres está pronto para receber conexões");
  }
}

process.stdout.write("\n\n🔴 Aguardando o Postgres aceitar conexões");
checkPostgres();
