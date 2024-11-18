module.exports = {
    // Extensões de arquivos a serem testados
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
  
    // Padrão para encontrar arquivos de teste
    testRegex: ".*\\.test\\.ts$",
  
    // Ambiente de teste (Node.js para aplicações backend)
    testEnvironment: "node",
  
    // Transformar arquivos TypeScript em JavaScript
    transform: {
      "^.+\\.(ts|tsx)$": "esbuild-jest",
    },
  };
  