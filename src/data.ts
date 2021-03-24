import { ISingleChild } from "./models";

export const data: ISingleChild[] = [
  {
    id: 1,
    name: 'United States',
    childs: [
      {
        id: 2,
        name: 'Chicago',
        childs: null
      },
      {
        id: 3,
        name: 'New York',
        childs: [
          {
            id: 4,
            name: 'New Jersey',
            childs: [
              {
                id: 5,
                name: 'Stated Island',
                childs: null
              }
            ]
          },
          {
            id: 6,
            name: 'Brooklyn',
            childs: null
          },
          {
            id: 7,
            name: 'Queens',
            childs: null
          }
        ]
      }
    ]
  },
  {
    id: 221,
    name: 'Venezuela',
    childs: [
      {
        id: 321,
        name: 'Caracas',
        childs: [
          {
            id: 246,
            name: 'La Lagunita',
            childs: null
          },
          {
            id: 124,
            name: 'La Guaira',
            childs: null
          },
          {
            id: 953,
            name: 'Petare',
            childs: null
          }
        ]
      },
      {
        id: 935,
        name: 'Tachira',
        childs: [
          {
            id: 590,
            name: 'San Cristobal',
            childs: [
              {
                id: 103,
                name: 'Barrio Obrero',
                childs: null
              },
              {
                id: 401,
                name: 'La Concordia',
                childs: null
              },
              {
                id: 105,
                name: 'Pueblo Nuevo',
                childs: null
              }
            ]
          },
          {
            id: 290,
            name: 'Tariba',
            childs: null
          },
          {
            id: 238,
            name: 'Peribeca',
            childs: null
          }
        ]
      },
      {
        id: 490,
        name: 'Valencia',
        childs: [
          {
            id: 291,
            name: 'Tucacas',
            childs: null
          }
        ]
      }
    ]
  }
]