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
    const state = {
      columns: [
        { title: 'ID', field: 'originId' },
        { title: 'Tipo', field: 'type' },
        { title: 'Nome', field: 'name' },
        { title: 'Quantidade', field: 'quantity' },
        { title: 'Valor R$', field: 'value'},
      ],
      data: props.salesData,
    }
    setState(state)
  }, [props.salesData])

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <MaterialTable
        style={{ width: '60em', padding: '1em', margin: '4em', zIndex:'0'}}
        title='Faturamento'
        columns={state.columns}
        data={state.data}
        options={{exportButton:true}}
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
            exportTitle:'Exportar',
          },
          body: {
            emptyDataSourceMessage: 'Não há serviços neste dia',
            editTooltip: 'Editar',
            deleteTooltip: 'Remover',
            editRow: {
              deleteText: 'Certeza de que quer remover?',
              saveTooltip: 'Salvar',
              cancelTooltip: 'Cancelar',
            },
          },
        }}
        
      />
    </div>
  )
}
