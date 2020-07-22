import React, { useEffect } from 'react'
import MaterialTable from 'material-table'
import { Radio } from '@material-ui/core'
import banhoSvg from '../images/pets-bath.svg'
import tosaSvg from '../images/pet-grooming.svg'
import consultaSvg from '../images/stethoscope.svg'
import banhoTosaSvg from '../images/pet-comb.svg'

function serviceToSvg(service) {
  switch (service) {
    case 'Só banho':
      return banhoSvg
    case 'Só tosa':
      return tosaSvg
    case 'Banho e tosa':
      return banhoTosaSvg
    case 'Consulta':
      return consultaSvg
    default:
      return ''
  }
}

function getDiaSemana(dia) {
  let diaSemana
  switch (dia) {
    case 0:
      diaSemana = 'Domingo'
      break
    case 1:
      diaSemana = 'Segunda'
      break
    case 2:
      diaSemana = 'Terça'
      break
    case 3:
      diaSemana = 'Quarta'
      break
    case 4:
      diaSemana = 'Quinta'
      break
    case 5:
      diaSemana = 'Sexta'
      break
    case 6:
      diaSemana = 'Sábado'
      break
    case 7:
      diaSemana = 'Domingo'
      break
  }
  return diaSemana
}

function getNomeMes(mes) {
  let nomeMes
  switch (mes - 1) {
    case 0:
      nomeMes = 'Janeiro'
      break
    case 1:
      nomeMes = 'Fevereiro'
      break
    case 2:
      nomeMes = 'Março'
      break
    case 3:
      nomeMes = 'Abril'
      break
    case 4:
      nomeMes = 'Maio'
      break
    case 5:
      nomeMes = 'Junho'
      break
    case 6:
      nomeMes = 'Julho'
      break
    case 7:
      nomeMes = 'Agosto'
      break
    case 8:
      nomeMes = 'Setembro'
      break
    case 9:
      nomeMes = 'Outubro'
      break
    case 10:
      nomeMes = 'Novembro'
      break
    case 11:
      nomeMes = 'Dezembro'
      break
  }
  return nomeMes
}

export default function BookingTable(props) {
  const columns = [
    { title: 'Hora', field: 'hour', type: 'time', render: rowData=>(`${rowData.hour}:00`) },
    { title: 'Disponível', field: 'free', type: 'boolean' },
    {
      title: 'Serviço',
      render: (rowData) => (
        <img  src={serviceToSvg(rowData.serviceType)} style={{ width: 50 }} />
      ),
    },
    { title: 'Nome do Cliente', field: 'clientName', type: 'text' },
    { title: 'Nome do Pet', field: 'petName', type: 'text' },
  ]
  const [selectedHour, setSelectedHour] = React.useState('')
  const [formattedDate, setFormattedDate] = React.useState('')

  const dataFormatada = (date) => {
    let data = new Date(date),
      dia = data.getDate().toString().padStart(2, '0'),
      mes = (data.getMonth() + 1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
      ano = data.getFullYear(),
      diaSemana = data.getDay()

    return `${getDiaSemana(diaSemana)}, ${dia} de ${getNomeMes(mes)} de ${ano}`
  }

  useEffect(() => {
    setFormattedDate(dataFormatada(props.date))
    setSelectedHour('')
  }, [props.date])

  return (
    <MaterialTable
      columns={columns}
      data={props.freeSlots}
      title={formattedDate}
      style={{ minWidth: '45em' }}
      actions={[
        {
          icon: 'save',
          tooltip: 'Selecionar',
          onClick: (event, rowData) => {
            setSelectedHour(rowData.hour)
            props.selectHour(rowData.hour)
          },
        },
      ]}
      components={{
        Action: (propAc) => (
          <Radio
            checked={selectedHour === propAc.data.hour}
            value={propAc.data.hour}
            disabled={!propAc.data.free}
            onClick={(ev) => {
              propAc.action.onClick(ev, propAc.data)
            }}
          />
        ),
      }}
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
          actions: 'Selecionar',
        },
        toolbar: {
          nRowsSelected: '{0} linhas selecionadas',
          searchTooltip: 'Pesquisar',
          searchPlaceholder: 'Pesquisar',
        },
        body: {
          emptyDataSourceMessage: 'Não há horários neste dia',
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
  )
}
