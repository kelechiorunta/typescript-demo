import User from "./models/User";
import { getUsers } from "./server";
import { GraphQLContext } from "./types/types";
import { GridFSBucket, ObjectId, Db } from 'mongodb';
import mongoose from "mongoose";

const resolvers = {
    Query: {
        otherClients: async (_: any, args: any, context: any) => {
            if (!context?.user) return [];
      
            try {
              const users = await User.find({ _id: { $ne: context.user._id } });
                return users
            } catch (error) {
              console.error(error);
              throw new Error("Failed to fetch users");
            }
          },
  
        auth: async (_: any, args: any, context: any) => {
            if (!context?.user) return null;
            return context.user
        },

        getVideo: async (_:any, { email }: { email: string }, context: any) => {
            // Make sure the token is verified here if needed
            return `http://localhost:3700/api/videos/${email}`;
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
        },
        
        getBackgroundImageIds: async (_: any, { email }: { email: string }) => {
            const user = await User.findOne({ email });
            if (!user) throw new Error('User not found');
          
            return {
              backgroundImageId: user.backgroundImageId?.toString() || null,
              backgroundPlaceholderId: user.backgroundPlaceholderId?.toString() || null,
            };
          }
    },

    Mutation: {
        updateProfileBackground: async (_: any, { username, backgroundImage }: { username: string, backgroundImage: string }, context: GraphQLContext) => {
          const user = await User.findOneAndUpdate(
            { username },
            { backgroundImage },
            { new: true } // return the updated document
          );
    
          if (!user) {
            throw new Error('User not found');
          }
            
          const io = context.req.app.get('io'); // get socket.io instance
    
          io.emit('newMessage', user);
    
          return user;
        },
        
        setBackgroundImage: async (_: any, { email }: { email: string }) => {

            const db: Db | any = mongoose.connection.db
            const gfs = new GridFSBucket(db, {
              bucketName: 'backgroundImages',
            });
      
            const user = await User.findOne({ email });
            if (!user || !user.backgroundImageId || !user.backgroundPlaceholderId) {
              throw new Error('User or images not found');
            }
      
            const imageUrl = `http://localhost:3700/pic/images/${user.backgroundImageId}`;
            const placeholderUrl = `http://localhost:3700/pic/images/${user.backgroundPlaceholderId}`;
      
            return {
              backgroundImage: imageUrl,
              backgroundPlaceholder: placeholderUrl,
            };
          },

        sendMessage: async (_: any, { content }: {content: any}, { req }: {req: any}) => {
            const io = req.app.get('io'); // get io instance from Express
      
            // Perform DB operations, etc...
            const newMessage = {
              id: Date.now().toString(),
              content,
              timestamp: new Date().toISOString(),
            };
      
            io.emit('newMessage', newMessage); // 🔥 emit socket event
      
            return newMessage;
          },
      }
}

export default resolvers