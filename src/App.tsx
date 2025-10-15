import { useState, FormEvent } from 'react'
import './App.css'

interface InfoProps{
  title: string,
  gasolina: string | number,
  alcool: string | number,
}

function App(){
  //Para captar o que tem dentro dos inputs
  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)

  //Aparecer a info de forma dinamica, passando por objeto, para isso criamos a interface (typescript)
  const [info, setInfo] = useState<InfoProps>()

  //Função de calcular
  function calcular(event: FormEvent){
    event.preventDefault();
    
    let calculo = (alcoolInput / gasolinaInput)

    if(calculo <= 0.7){
      setInfo({
        title: 'Compensa usar Álcool',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    } else{
      setInfo({
        title: 'Compensa usar Gasolina',
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput)
      })
    }
  }

  //Para formatar a moeda javascript
  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString('pt-br',{
      style: "currency",
      currency: "BRL"
    })

    return valorFormatado
  }

  return(
    <div>
      <main className='container'>
        <h1 className='title'>Gasolina ou Álcool</h1>

          <form className='form' onSubmit={calcular}>
            <label>Alcool (preço por litro)</label>
            <input 
              className='input'
              type="number"
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={alcoolInput}
              onChange={ (e)=> setAlcoolInput(Number(e.target.value)) }            
            />

            <label>Gasolina (preço por litro)</label>
            <input 
              className='input'
              type="number"
              placeholder='4,90'
              min='1'
              step='0.01'
              required
              value={gasolinaInput}
              onChange={ (e)=> setGasolinaInput(Number(e.target.value)) }       
            />

            <input 
              className='button'
              type="submit"
              value='Calcular'
            />
          </form>

          {/* Só quero que aparece quando o usuário inserir o numéro e dar o submit */}
          {info && Object.keys(info).length > 0 &&(
            <section className='result'>
              <h2 className='result-title'>{info.title}</h2>

              <span>Alcool {info.alcool}</span>
              <span>Gasolina {info.gasolina}</span>
            </section>
          )}

      </main>
    </div>
  )
}

export default App