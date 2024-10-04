import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import org.bson.Document;
import com.mongodb.client.model.Projections;

public class MongoExample {
    public static void main(String[] args) {
        MongoClient mongoClient = MongoClients.create("mongodb+srv://socialcures2:5ocialcuresfal12024%23%23@socialcures2.6tiqn.mongodb.net/?retryWrites=true&w=majority&appName=SocialCures2");
        MongoDatabase database = mongoClient.getDatabase("test"); // Specify your database name
        MongoCollection<Document> collection = database.getCollection("campusissues");
        MongoCursor<Document> cursor = collection.find().projection(Projections.fields(Projections.include("latitude", "longitude", "description"))).limit(5).iterator();
        try {
            while(cursor.hasNext()) {
                Document doc = cursor.next();
                System.out.println("Latitude: " + doc.getDouble("latitude") + ", Longitude: " + doc.getDouble("longitude") + ", Description: " + doc.getString("description"));
            }
        } finally {
            cursor.close();
            mongoClient.close();
        }
    }
}
