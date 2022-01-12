const yargs = require("yargs");

const child = require("child_process");
const key = "123";

const argv = yargs
  .command(
    "access",
    "Comando para iniciar servidor",
    {
      key: {
        describe: "Contraseña",
        demand: true,
        alias: "k",
      },
    },
    (args) => {
      args.key == key
        ?
          child.exec("node index.js", (err, stdout) => {
            err ? console.log(err) : console.log(stdout);
          })
        :
          console.log("Error en la contraseña");
    }
  )
  .help().argv;