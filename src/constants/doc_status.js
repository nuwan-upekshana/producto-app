const DOCSTATUS = [
  {
    label: "New",
    value: 1014,
    coloumn: "DocStatus",
    icon: (
      <i
        className="mdi mdi-file-document font-size-16 align-middle text-info me-2"
        id="New"
      ></i>
    ),
    show: false,
  },
  {
    label: "Draft",
    value: 1010,
    coloumn: "DocStatus",
    icon: (
      <i
        className="mdi mdi-file-document font-size-16 align-middle text-warning me-2"
        id="Draft"
      ></i>
    ),
    show: true,
  },
  {
    label: "Release",
    value: 1011,
    coloumn: "DocStatus",
    icon: (
      <i
        className="mdi mdi-file-document font-size-16 align-middle text-success me-2"
        id="Release"
      ></i>
    ),
    show: true,
  },
  {
    label: "Archive",
    value: 1012,
    coloumn: "DocStatus",
    icon: (
      <i
        className="mdi mdi-file-document font-size-16 align-middle text-primary me-2"
        id="Archive"
      ></i>
    ),
    show: false,
  },
]

export const DOCSTATUSCODES = {
  DRAFT: 1010,
  RELEASE: 1011,
  ARCHIVE: 1012,
  NEW: 1014,
}

export default DOCSTATUS
