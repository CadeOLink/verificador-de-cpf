/**
 * * Modelo feito antes da resolução do exercício
 */
// function VerificadorDeCPF(cpf){
//    let cpfLimpo, digito1, digito2, N = 11

//    typeof cpf === typeof "String" ? cpfLimpo = cpf.replace(/\D+/g, '') : cpf = cpf.toString(); cpfLimpo = cpf.replace(/\D+/g, '') 
   
//    if(cpfLimpo.length < 11){
//       console.log("Digite 11 digito")
//    }
//       cpfArray = Array.from(cpfLimpo)
//          const aa = cpfArray.reduce((count, value, index) => {
//             N--
//                if(index <= 8){
//                   return count + Number(value)*N
//                }else{
//                   return count
//                }
//          } ,0)
   
//       let x = 11 - (aa % 11)
//       x > 9 ? digito1 = 0 : digito1 = x
      
//       if(cpfArray[9] == digito1){
//          N = 12
//          const ab = cpfArray.reduce((count, value, index) => {
//             N--
//                if(index <= 9){
//                   return count + Number(value)*N
//                }else{
//                   return count
//                }
//          } ,0)
//          let x = 11 - (ab % 11)
//          x > 9 ? digito2 = 0 : digito2 = x
//          if(cpfArray[10] == digito2){
//             return console.log("Cpf válido")
//          }else{
//             return console.log("Cpf inválido")
//          }
//       }else{
//          return console.log("Cpf inválido")
//       }
// }

/**
 * * Resolução do exercíco
 * ! Alterações foram feitas pegar dados na WEB
 * ? CPF válido: 
 */

function enter(){
   const inputCpf = document.querySelector('.input-cpf')
   inputCpf.addEventListener('keyup', e => {
   if(e.keyCode === 13){
         PegaCpf()
   }
   })
}enter()

function PegaCpf(){
   const inputCpf = document.querySelector('.input-cpf').value
   const cpf = new ValidadorDeCPF(inputCpf);
   const labelValidade  = document.querySelector('.validade')
   cpf.valida() ? labelValidade.innerText = `${inputCpf.replace(/\D+/g, '')}: válido` : labelValidade.innerText =`${inputCpf.replace(/\D+/g, '')}: inválido`
}

function ValidadorDeCPF(cpfEnviado){
   Object.defineProperty(this, 'cpfLimpo',{
      enumerable: true,
      get: function(){
         return cpfEnviado.replace(/\D+/g, '')
      }
   })
}

   ValidadorDeCPF.prototype.valida = function(){
      if(typeof this.cpfLimpo === "undefined") return false;
      if(this.cpfLimpo.length !== 11) return false;
      if(this.isSequencia()) return false;

      const cpfParcial = this.cpfLimpo.slice(0,-2);
      const digito1 = this.criaDigito(cpfParcial)
      const digito2 = this.criaDigito(cpfParcial + digito1)

      const novoCpf = cpfParcial + digito1 + digito2

      return novoCpf === this.cpfLimpo
   }

   ValidadorDeCPF.prototype.criaDigito = function(cpfParcial){
      const cpfArray = Array.from(cpfParcial)

      let regressivo = cpfArray.length + 1;
      const total = cpfArray.reduce((ac, val) => {
         ac += (Number(val) * regressivo)
         regressivo--
         return ac
      },0)

      const digito = 11 - (total % 11);
      return digito > 9 ? digito = "0" : String(digito)
      
   }

   ValidadorDeCPF.prototype.isSequencia = function(){
      return this.cpfLimpo[0].repeat(this.cpfLimpo.length) === this.cpfLimpo
   }
   