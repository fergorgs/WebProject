import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable from 'material-table'

const useStyles = makeStyles({
  root: {
    width: '60em',
  },
  container: {
    maxHeight: 440,
  },
})

export default function ServiceTable(props) {
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  })

  useEffect(() => {
    // let temp = props.services
    // temp.sort((a, b) => {
    //   return new Date(a.date) - new Date(b.date)
    // })
    const state = {
      columns: [
        { title: 'ID', field: 'saleId' },
        { title: 'Tipo', field: 'saleType' },
        { title: 'Nome', field: 'saleName' },
        { title: 'Quantidade', field: 'saleAmount' },
        { title: 'Valor', field: 'saleValue' },
      ],
    //   data: temp.map((service) => {
    //     const date = new Date(service.date)
    //     let minutes = date.getMinutes()
    //     minutes = minutes == '0' ? '00' : minutes
    //     return {
    //       date: `${date.getHours()}:${minutes}`,
    //       serviceType: service.serviceType,
    //       clientCpf: service.clientCpf,
    //       clientPetName: service.clientPetName,
    //       id: service._id,
    //     }
    //   }),
        data: [{saleId: '156232', saleType: 'Serviço', saleName: 'Massage sensual', saleAmount: '3', saleValue: '15'},
                {saleId: '156325', saleType: 'Serviço', saleName: 'Massage nos pés', saleAmount: '5', saleValue: '45'},
                {saleId: '230256', saleType: 'Adoção', saleName: 'Doguinho', saleAmount: '2', saleValue: '60'},
                {saleId: '856321', saleType: 'Venda', saleName: 'Escravo Colombiano', saleAmount: '14', saleValue: '75'},
                {saleId: '123654', saleType: 'Adoção', saleName: 'Gato', saleAmount: '1', saleValue: '15'},
                {saleId: '874123', saleType: 'Venda', saleName: 'Ração', saleAmount: '3', saleValue: '50'},
        ]
    }
    setState(state)
  }, [props.services])

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <MaterialTable
        style={{width: '60em', padding: '1em', margin: '4em'}}
        title="Vendas feitas"
        columns={state.columns}
        data={state.data}
        localization={{
          pagination: {
            labelDisplayedRows: '{from}-{to} de {count}',
            firstTooltip: 'Primeira Página',
            lastAriaLabel: 'Última Página',
            nextTooltip: 'Próxima Página',
            previousTooltip: 'Página Anterior',
            labelRowsSelect: 'linhas',
            lastTooltip: 'Última Página',
          },
          header: {
            actions: 'Ações',
          },
          toolbar: {
            nRowsSelected: '{0} linhas selecionadas',
            searchTooltip: 'Pesquisar',
            searchPlaceholder: 'Pesquisar',
          },
          body: {
            emptyDataSourceMessage: 'Não há serviços neste dia',
            editTooltip: 'Editar',
            deleteTooltip: 'Remover',
            editRow:{
              deleteText:'Certeza de que quer remover?',
              saveTooltip:'Salvar',
              cancelTooltip:'Cancelar'
            }
          },
        }}
        editable={{
        //   onRowUpdate: (newData, oldData) =>
        //     new Promise((resolve) => {
        //       fetch('/service/update', {
        //         method: 'POST',
        //         headers: {
        //           Accept: 'application/json',
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(newData),
        //       }).then(async (res) => {
        //         if (res.ok) {
        //           setTimeout(() => {
        //             resolve()
        //             if (oldData) {
        //               setState((prevState) => {
        //                 const data = [...prevState.data]
        //                 data[data.indexOf(oldData)] = newData
        //                 return { ...prevState, data }
        //               })
        //             }
        //           }, 600)
        //         } else {
        //           const err = await res.json()
        //           alert(err.error)
        //         }
        //       })
        //     }),
        //   onRowDelete: (oldData) =>
        //     new Promise((resolve) => {
        //       fetch('/service/remove', {
        //         method: 'DELETE',
        //         headers: {
        //           Accept: 'application/json',
        //           'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify({ id: oldData.id }),
        //       }).then(async (res) => {
        //         if (res.ok) {
        //           setTimeout(() => {
        //             resolve()
        //             setState((prevState) => {
        //               const data = [...prevState.data]
        //               data.splice(data.indexOf(oldData), 1)
        //               return { ...prevState, data }
        //             })
        //           }, 600)
        //         } else {
        //           const err = await res.json()
        //           alert(err.error)
        //         }
        //       })
        //     }),
        }}
      />
    </div>
  )
}
