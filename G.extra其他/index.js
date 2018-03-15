

process.stdin.on('data', (inputs)=>{
  process.stdout.write(`->: ${inputs.toString()}`)
})