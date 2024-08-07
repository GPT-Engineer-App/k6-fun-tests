import { useState } from "react";
import { Cat, Heart, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive markings and vocal nature." },
  { name: "Persian", description: "Recognized for their long fur and flat faces." },
  { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance." },
  { name: "British Shorthair", description: "Known for their chunky bodies, dense coat and broad faces." },
  { name: "Scottish Fold", description: "Characterized by a gene mutation that affects cartilage throughout the body, giving the ears a 'folded' appearance." },
];

const Index = () => {
  const [likes, setLikes] = useState(0);
  const { toast } = useToast();

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: `This page has been liked ${likes + 1} times.`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-4xl font-bold flex items-center justify-center">
            <Cat className="mr-2 text-purple-600" /> All About Cats
          </CardTitle>
          <CardDescription className="text-center text-lg">
            Discover the fascinating world of our feline friends
          </CardDescription>
        </CardHeader>
        <CardContent>
          <motion.img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Cat03.jpg/1200px-Cat03.jpg"
            alt="A cute cat"
            className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <p className="text-xl text-gray-700 mb-6">
            Cats are fascinating creatures that have been domesticated for thousands of years. They are known for their independence, agility, and affectionate nature.
          </p>
          <Tabs defaultValue="characteristics" className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card>
                <CardHeader>
                  <CardTitle>Characteristics of Cats</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>Excellent hunters with sharp claws and teeth</li>
                    <li>Flexible bodies and quick reflexes</li>
                    <li>Keen senses, especially their night vision</li>
                    <li>Communicate through vocalizations, body language, and scent</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card>
                <CardHeader>
                  <CardTitle>Popular Cat Breeds</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {catBreeds.map((breed, index) => (
                      <li key={index} className="flex items-start">
                        <Info className="mr-2 h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <span className="font-semibold">{breed.name}:</span> {breed.description}
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className="text-xl text-gray-700 mb-6">
            Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and personality.
          </p>
          <div className="flex justify-center">
            <Button onClick={handleLike} className="bg-pink-500 hover:bg-pink-600">
              <Heart className="mr-2 h-4 w-4" /> Like This Page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
