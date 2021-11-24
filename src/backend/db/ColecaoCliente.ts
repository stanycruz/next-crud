import { db } from '../config'
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    QueryDocumentSnapshot,
    SnapshotOptions,
    DocumentData,
} from 'firebase/firestore'
import Cliente from '../../core/Cliente'
import ClienteRepositorio from '../../core/ClienteRepositorio'

const clienteCollectionRef = collection(db, 'clientes')

export default class ColecaoCliente implements ClienteRepositorio {

    #conversor = {
        toFirestore(cliente: Cliente): DocumentData {
            return {
                nome: cliente.nome,
                idade: cliente.idade,
            }
        },
        fromFirestore(
            snapshot: QueryDocumentSnapshot,
            options: SnapshotOptions
        ): Cliente {
            const dados = snapshot.data(options)!
            return new Cliente(dados.nome, dados.idade, snapshot?.id)
        }
    }

    async salvar(cliente: Cliente): Promise<Cliente> {

        const ref = clienteCollectionRef.withConverter(this.#conversor)

        if (cliente?.id) {
            const clienteDoc = doc(db, 'clientes', cliente.id)
            const novosCampos = { nome: cliente.nome, idade: cliente.idade }
            await updateDoc(clienteDoc, novosCampos)
            return cliente
        } else {
            const docRef = await addDoc(ref, cliente)
            return docRef
        }
    }

    async excluir(cliente: Cliente): Promise<void> {
        const clienteDoc = doc(db, 'clientes', cliente.id)
        return await deleteDoc(clienteDoc)
    }

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.colecao()
        return query.docs.map(doc => doc.data())
    }

    private colecao() {
        return getDocs(clienteCollectionRef.withConverter(this.#conversor))
    }
}