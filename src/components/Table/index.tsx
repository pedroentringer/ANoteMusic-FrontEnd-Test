import React, { PropsWithChildren, ReactElement, useMemo } from 'react'

import { useTable, TableOptions } from 'react-table'

import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react'
export interface TableProperties<T extends Record<string, unknown>>
  extends TableOptions<T> {
  tableName: string
}

export default function Table<T extends Record<string, unknown>>(
  props: PropsWithChildren<TableProperties<T>>
): ReactElement {
  const { tableName, data, columns } = props

  const tableData = useMemo(() => [...data], [data])
  const tableColumns = useMemo(() => [...columns], [columns])

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns: tableColumns,
      data: tableData
    })

  return (
    <ChakraTable {...getTableProps()} size="sm">
      <Thead>
        {headerGroups.map((headerGroup, i) => (
          <Tr
            {...headerGroup.getHeaderGroupProps()}
            key={`table-head-tr-${tableName}-${i}`}
          >
            {headerGroup.headers.map((column, j) => {
              const headerProps = column.getHeaderProps()

              return (
                <Th
                  {...headerProps}
                  style= {{ ...headerProps.style }}
                  key={`table-body-tr-th-${tableName}-${j}`}
                >
                  {column.render('Header')}
                </Th>
              )
            })}
          </Tr>
        ))}
      </Thead>
      <Tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row)
          return (
            <Tr
              {...row.getRowProps()}
              key={`table-body-tr-${tableName}-${i}`}
              textDecoration={row.values.isCompleted ? 'line-through' : 'none'}
            >
              {row.cells.map((cell, j) => {
                return (
                  <Td
                    {...cell.getCellProps()}
                    key={`table-body-tr-td-${tableName}-${j}`}
                  >
                    {cell.render('Cell')}
                  </Td>
                )
              })}
            </Tr>
          )
        })}
      </Tbody>
    </ChakraTable>
  )
}
