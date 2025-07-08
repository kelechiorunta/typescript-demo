import User from "./models/User";
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

        filteredClients: async (_: any, args: any, context: any) => {
            if (!context.user) return null;
          
            const { id, username, email } = args.client || {};
          
            const query: any = {};
          
            if (id) query._id = id;
            if (username) query.username = { $regex: username, $options: 'i' };
            if (email) query.email = { $regex: email, $options: 'i' };
          
            try {
              const filteredUsers = await User.find(query);
              return filteredUsers;
            } catch (err) {
              console.error('Error fetching filtered clients:', err);
              throw new Error('Failed to fetch filtered clients.');
            }
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
    },

    Mutation: {
        updateProfileBackground: async (_: any, { username, backgroundImage }: { username: string, backgroundImage: string }) => {
          const user = await User.findOneAndUpdate(
            { username },
            { backgroundImage },
            { new: true } // return the updated document
          );
    
          if (!user) {
            throw new Error('User not found');
          }
    
          return user;
        }
      }
}

export default resolvers