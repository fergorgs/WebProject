import React, { useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
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
  const classes = useStyles()
  const [state, setState] = React.useState({
    columns: [],
    data: [],
  })

  useEffect(() => {
    let temp = props.services
    temp.sort((a, b) => {
      return new Date(a.date) - new Date(b.date)
    })
    const state = {
      columns: [
        { title: 'Horas', field: 'date', type: 'time' },
        { title: 'Serviço', field: 'serviceType' },
        { title: 'CPF do Cliente', field: 'clientCpf' },
        { title: 'Animal', field: 'clientPetName' },
      ],
      data: temp.map((service) => {
        const date = new Date(service.date)
        return {
          date: `${date.getHours()}:${date.getMinutes()}`,
          serviceType: service.serviceType,
          clientCpf: service.clientCpf,
          clientPetName: service.clientPetName,
          id: service._id,
        }
      }),
    }
    setState(state)
  }, [props.services])

  return (
    <div>
      <MaterialTable
        style={{ width: '60em' }}
        title={props.formattedDate}
        columns={state.columns}
        data={state.data}
        editable={{
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve) => {
              fetch('/service/update', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
              }).then(async (res) => {
                if(res.ok){

                  setTimeout(() => {
                    resolve()
                    if (oldData) {
                      setState((prevState) => {
                        const data = [...prevState.data]
                        data[data.indexOf(oldData)] = newData
                        return { ...prevState, data }
                      })
                    }
                  }, 600)
                }else{
                  const err = await res.json()
                  alert(err.error)
                }
              })
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve) => {
              fetch('/service/remove', {
                method: 'DELETE',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: oldData.id }),
              }).then(async (res) => {
                if (res.ok) {
                  setTimeout(() => {
                    resolve()
                    setState((prevState) => {
                      const data = [...prevState.data]
                      data.splice(data.indexOf(oldData), 1)
                      return { ...prevState, data }
                    })
                  }, 600)
                } else {
                  const err = await res.json()
                  alert(err.error)
                }
              })
            }),
        }}
      />
    </div>
  )
}
