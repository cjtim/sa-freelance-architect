import React, { useState } from 'react'

import MUIDataTable, { MUIDataTableProps } from 'mui-datatables'
import { backendInstance, getAccessToken } from '@/lib/axios'
import { Checkbox } from '@chakra-ui/react'
import { formatDate } from '@/utils/date'
import PageLayout from '@/components/PageLayout'
import NavBar from '@/components/NavBar'

interface LineGroupDetails {
  id: string
  joinedWhen: Date
  isInGroup: boolean
}
const GroupLinePage: React.FC = () => {
  const [data, setData] = useState<MUIDataTableProps['data']>([])
  const columns: MUIDataTableProps['columns'] = [
    { label: 'Group ID', name: 'id' },
    {
      label: 'joinedWhen',
      name: 'joinedWhen',
      options: {
        customBodyRenderLite: (dataIndex) => {
          const obj = data[dataIndex] as LineGroupDetails
          return <>{formatDate(obj.joinedWhen)}</>
        },
      },
    },
    {
      label: 'Linebot in group',
      name: 'isInGroup',
      options: {
        customBodyRenderLite: (dataIndex, rowIndex) => {
          const obj = data[dataIndex] as LineGroupDetails
          return <Checkbox isChecked={obj.isInGroup} key={rowIndex} />
        },
      },
    },
  ]
  const options: MUIDataTableProps['options'] = {
    filterType: 'checkbox',
    tableBodyHeight: '75vh',
    rowsPerPageOptions: [3, 5, 10, 15, 20, 50, 100],
  }
  React.useEffect(() => {
    getAccessToken().then((token) =>
      backendInstance
        .get('/dashboard/linegroup', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        })
        .then((resp) => setData(resp.data)),
    )
  }, [])
  return (
    <PageLayout windowTitle="Line Group list">
      <NavBar />
      <MUIDataTable
        columns={columns}
        data={data}
        title="Line Group List"
        options={options}
      />
    </PageLayout>
  )
}

export default GroupLinePage
