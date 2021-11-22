import Layout from '../components/Layout'
import Tabela from '../components/Tabela'
import Cliente from '../core/Cliente'

export default function Home() {

  const clientes = [
    new Cliente('Sarah Sara Viana', 77, '1'),
    new Cliente('Paulo Erick Freitas', 63, '2'),
    new Cliente('Edson Kevin Miguel Bernardes', 21, '3'),
    new Cliente('Murilo Kauê Pinto', 59, '4'),
  ]
  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo="Cadastro Simples">
        <Tabela clientes={clientes}></Tabela>
      </Layout>
    </div>
  )
}
