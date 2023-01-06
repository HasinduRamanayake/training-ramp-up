import { gql } from "@apollo/client";

export const STUDENT_GET_QUERY = gql`
  query getAllStudents {
    getAllStudents {      
      name
      id
      gender
      age
      address
      mobileNo
      DOB
      isArchive
    }
  }
`;



export const STUDENT_ADD_MUTATION = gql`

  mutation addStudent(
    $name: String!,
    $gender: String!,
    $address: String!,
    $mobileNo: Int!,
    $DOB: DateTime!,
    $age: Int!,
    $isArchive: Boolean!
  ) {
    addStudent(
      student: {
        name: $name
        gender: $gender
        address: $address
        mobileNo: $mobileNo
        DOB: $DOB
        age: $age
        isArchive: $isArchive
      }
    ) {
      name
      gender
      address
      mobileNo
      DOB
      age
      isArchive
    }
  }
`;

export const STUDENT_UPDATE_MUTATION = gql`
  mutation updateStudent(
    $id: String!
    $name: String!
    $gender: String!
    $address: String!
    $mobileNo: Int!
    $DOB: DateTime!
    $age: Int!
    $isArchive: Boolean!
  ) {
    updateStudent(
      student: {
        id: $id
        name: $name
        gender: $gender
        address: $address
        mobileNo: $mobileNo
        DOB: $DOB
        age: $age
        isArchive: $isArchive
      }
    ) {
      name
      gender
      address
      mobileNo
      DOB
      age
      isArchive
    }
  }
`;

export const STUDENT_REMOVE_MUTATION = gql`
  mutation removeStudent($id: String!) {
    removeStudent(id: $id) {
      name
      id
    }
  }
`;
