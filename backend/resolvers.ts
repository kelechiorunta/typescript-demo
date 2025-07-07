import { getUsers } from "./server";

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

        clients: async (_: any, args: any, context: any) => {
            
            // if (!context?.user) return null;
            
                try {
                  const response = await fetch("https://dummyjson.com/users", {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                  });
                  const result = await response.json();
                  return result?.users
                } catch (err) {
                  console.error("Failed to fetch users:", err);
                }
              }
    }
}

export default resolvers