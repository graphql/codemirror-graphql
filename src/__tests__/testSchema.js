/**
 *  Copyright (c) 2015, Facebook, Inc.
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree. An additional grant
 *  of patent rights can be found in the PATENTS file in the same directory.
 */

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLUnionType,
  GraphQLInterfaceType,
  GraphQLEnumType,
  GraphQLInputObjectType,
  GraphQLBoolean,
  GraphQLInt,
  GraphQLFloat,
  GraphQLString,
  GraphQLID,
  GraphQLList,
} from 'graphql';

// Test Schema

const TestEnum = new GraphQLEnumType({
  name: 'TestEnum',
  values: {
    RED: {},
    GREEN: {},
    BLUE: {},
  }
});

const TestInputObject = new GraphQLInputObjectType({
  name: 'TestInput',
  fields: () => ({
    string: { type: GraphQLString },
    int: { type: GraphQLInt },
    float: { type: GraphQLFloat },
    boolean: { type: GraphQLBoolean },
    id: { type: GraphQLID },
    enum: { type: TestEnum },
    object: { type: TestInputObject },
    // List
    listString: { type: new GraphQLList(GraphQLString) },
    listInt: { type: new GraphQLList(GraphQLInt) },
    listFloat: { type: new GraphQLList(GraphQLFloat) },
    listBoolean: { type: new GraphQLList(GraphQLBoolean) },
    listID: { type: new GraphQLList(GraphQLID) },
    listEnum: { type: new GraphQLList(TestEnum) },
    listObject: { type: new GraphQLList(TestInputObject) },
  })
});

const TestInterface = new GraphQLInterfaceType({
  name: 'TestInterface',
  resolveType: () => UnionFirst,
  fields: {
    scalar: {
      type: GraphQLString,
      resolve: () => ({})
    }
  }
});

const UnionFirst = new GraphQLObjectType({
  name: 'First',
  interfaces: [ TestInterface ],
  fields: () => ({
    scalar: {
      type: GraphQLString,
      resolve: () => ({})
    },
    first: {
      type: TestType,
      resolve: () => ({})
    }
  })
});

const UnionSecond = new GraphQLObjectType({
  name: 'Second',
  fields: () => ({
    second: {
      type: TestType,
      resolve: () => ({})
    }
  })
});

const TestUnion = new GraphQLUnionType({
  name: 'TestUnion',
  types: [ UnionFirst, UnionSecond ],
  resolveType() {
    return UnionFirst;
  }
});

const TestType = new GraphQLObjectType({
  name: 'Test',
  fields: () => ({
    test: {
      type: TestType,
      resolve: () => ({})
    },
    deprecatedTest: {
      type: TestType,
      deprecationReason: 'Use test instead.',
      resolve: () => ({})
    },
    union: {
      type: TestUnion,
      resolve: () => ({})
    },
    first: {
      type: UnionFirst,
      resolve: () => ({})
    },
    id: {
      type: GraphQLInt,
      resolve: () => ({})
    },
    isTest: {
      type: GraphQLBoolean,
      resolve: () => {
        return true;
      }
    },
    hasArgs: {
      type: GraphQLString,
      resolve(value, args) {
        return JSON.stringify(args);
      },
      args: {
        string: { type: GraphQLString },
        int: { type: GraphQLInt },
        float: { type: GraphQLFloat },
        boolean: { type: GraphQLBoolean },
        id: { type: GraphQLID },
        enum: { type: TestEnum },
        object: { type: TestInputObject },
        // List
        listString: { type: new GraphQLList(GraphQLString) },
        listInt: { type: new GraphQLList(GraphQLInt) },
        listFloat: { type: new GraphQLList(GraphQLFloat) },
        listBoolean: { type: new GraphQLList(GraphQLBoolean) },
        listID: { type: new GraphQLList(GraphQLID) },
        listEnum: { type: new GraphQLList(TestEnum) },
        listObject: { type: new GraphQLList(TestInputObject) },
      }
    },
  })
});

const TestMutationType = new GraphQLObjectType({
  name: 'MutationType',
  description: 'This is a simple mutation type',
  fields: {
    setString: {
      type: GraphQLString,
      description: 'Set the string field',
      args: {
        value: { type: GraphQLString }
      }
    }
  }
});

const TestSubscriptionType = new GraphQLObjectType({
  name: 'SubscriptionType',
  description: 'This is a simple subscription type',
  fields: {
    subscribeToTest: {
      type: TestType,
      description: 'Subscribe to the test type',
      args: {
        id: { type: GraphQLString }
      }
    }
  }
});

export const TestSchema = new GraphQLSchema({
  query: TestType,
  mutation: TestMutationType,
  subscription: TestSubscriptionType
});
