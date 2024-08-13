import { gql } from "@apollo/client";

export const TASK_LIST = gql`
  query Tasks {
    tasks(input: {}) {
      assignee {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      createdAt
      creator {
        avatar
        createdAt
        email
        fullName
        id
        type
        updatedAt
      }
      dueDate
      id
      name
      pointEstimate
      position
      status
      tags
    }
  }
`;
export const USERS_LIST = gql`
  query Users {
    users {
      avatar
      fullName
      id
    }
  }
`;
export const PROFILE_INFORMATION = gql`
  query Query {
    profile {
      avatar
      createdAt
      email
      fullName
      id
      type
      updatedAt
    }
  }
`;
export const ADD_TASK = gql`
  mutation Mutation($input: CreateTaskInput!) {
    createTask(input: $input) {
      dueDate
      name
      pointEstimate
      tags
      status
    }
  }
`;
export const UPDATE_TASK = gql`
  mutation Mutation($input: UpdateTaskInput!) {
    updateTask(input: $input) {
      dueDate
      name
      pointEstimate
      tags
      status
      id
    }
  }
`;
export const DELETE_TASK = gql`
  mutation Mutation($input: DeleteTaskInput!) {
    deleteTask(input: $input) {
      id
    }
  }
`;
