import { isValidElement, cloneElement } from 'react'
import type { ReactNode } from 'react'

interface TableProps {
  headers: React.ReactNode[]
  children: ReactNode
}

export function Table({ headers, children }: TableProps) {
  return (
    <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          minWidth: '100%',
          borderRadius: '8px',
          fontFamily: 'Montserrat, sans-serif',
        }}
      >
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                style={{
                  padding: '1rem 0.75rem',
                  textAlign: 'left',
                  borderBottom: '1px solid #ddd',
                  backgroundColor: '#f5f5f5',
                }}
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.isArray(children)
            ? children.map((row, rowIndex) =>
                isValidElement(row)
                  ? cloneElement(row as React.ReactElement<any>, {
                      style: {
                        backgroundColor: rowIndex % 2 === 0 ? '#ffffff' : '#f9f9f9',
                      },
                      children: (() => {
                        const rowChildren = (row.props as { children?: React.ReactNode }).children;
                        if (Array.isArray(rowChildren)) {
                          return rowChildren.map((td, i) =>
                            isValidElement(td)
                              ? cloneElement(td as React.ReactElement<any>, {
                                  ...((td.type === 'td' || td.type === 'th') && { ['data-label']: headers[i] }),
                                  style: {
                                    padding: '1rem 0.75rem',
                                    ...((td.props as { style?: React.CSSProperties }).style),
                                  },
                                })
                              : td
                          );
                        } else if (isValidElement(rowChildren)) {
                          return cloneElement(rowChildren as React.ReactElement<any>, {
                            ...((rowChildren.type === 'td' || rowChildren.type === 'th') && { ['data-label']: headers[0] }),
                            style: {
                              padding: '1rem 0.75rem',
                              ...((rowChildren.props as { style?: React.CSSProperties }).style),
                            },
                          });
                        } else {
                          return rowChildren;
                        }
                      })(),
                    })
                  : row
              )
            : children}
        </tbody>
      </table>

      <style>
        {`
          @media (max-width: 768px) {
            table, thead, tbody, th, td, tr {
              display: block;
              width: 100%;
            }

            thead {
              display: none;
            }

            tr {
              margin-bottom: 1rem;
              border: 1px solid #ddd;
              border-radius: 8px;
              padding: 1rem;
              box-sizing: border-box;
              background-color: white;
              overflow-wrap: break-word;
            }

            td {
              display: flex;
              justify-content: flex-start;
              padding: 1rem 0.75rem;
              border-bottom: 1px solid #eee;
              word-break: break-word;
              flex-wrap: wrap;
              width: 100%;
              gap: 0.5rem;
            }

            td:last-child {
              border-bottom: none;
            }

            td::before {
              content: attr(data-label);
              font-weight: bold;
              color: #555;
              margin-right: 0.5rem;
              min-width: 120px;
            }
          }
        `}
      </style>
    </div>
  )
}
