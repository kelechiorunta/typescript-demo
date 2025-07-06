const resolvers = {
    Query: {
        users: async (_: any, args: any, context: any) => {
            if (!context?.user) return [];
  
            try {
                return context.user
          
            } catch (error) {
                console.error(error);
                throw new Error("Failed to fetch users");
            }
        },
  
        auth: async (_: any, args: any, context: any) => {
            if (!context?.user) return null;
            return context.user
        },
    }
}

export default resolvers