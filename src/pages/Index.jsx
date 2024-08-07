import { useState, useEffect } from "react";
import { Cat, Heart, Info, Paw, Moon, Sun, ChevronUp, Palette } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const catBreeds = [
  { name: "Siamese", description: "Known for their distinctive markings and vocal nature.", image: "https://upload.wikimedia.org/wikipedia/commons/2/25/Siam_lilacpoint.jpg" },
  { name: "Persian", description: "Recognized for their long fur and flat faces.", image: "https://upload.wikimedia.org/wikipedia/commons/1/15/White_Persian_Cat.jpg" },
  { name: "Maine Coon", description: "One of the largest domesticated cat breeds with a distinctive physical appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Maine_Coon_cat_by_Tomitheos.JPG" },
  { name: "British Shorthair", description: "Known for their chunky bodies, dense coat and broad faces.", image: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Britishblue.jpg" },
  { name: "Scottish Fold", description: "Characterized by a gene mutation that affects cartilage throughout the body, giving the ears a 'folded' appearance.", image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Adult_Scottish_Fold.jpg" },
];

const catFacts = [
  "Cats sleep for about 70% of their lives.",
  "A group of cats is called a clowder.",
  "Cats have over 20 vocalizations, including the meow.",
  "The first cat in space was a French cat named Felicette in 1963.",
  "Cats have a third eyelid called the nictitating membrane.",
];

const catQuizQuestions = [
  {
    question: "What is a group of cats called?",
    options: ["A pride", "A clowder", "A pack", "A herd"],
    correctAnswer: "A clowder"
  },
  {
    question: "How many hours do cats typically sleep in a day?",
    options: ["8-10 hours", "12-14 hours", "16-20 hours", "22-23 hours"],
    correctAnswer: "16-20 hours"
  },
  {
    question: "Which of these is NOT a cat breed?",
    options: ["Siamese", "Persian", "Labrador", "Maine Coon"],
    correctAnswer: "Labrador"
  }
];

const themes = {
  light: "bg-gradient-to-b from-blue-100 to-purple-100",
  dark: "bg-gradient-to-b from-gray-800 to-gray-900",
  nature: "bg-gradient-to-b from-green-100 to-emerald-200",
  sunset: "bg-gradient-to-b from-orange-100 to-red-200",
  ocean: "bg-gradient-to-b from-blue-200 to-cyan-100"
};

const Index = () => {
  const [likes, setLikes] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [theme, setTheme] = useState("light");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % catFacts.length);
    }, 5000);

    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLike = () => {
    setLikes(likes + 1);
    toast({
      title: "Thanks for the love!",
      description: `This page has been liked ${likes + 1} times.`,
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuizAnswer = (answer) => {
    if (answer === catQuizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
      toast({
        title: "Correct!",
        description: "Great job!",
      });
    } else {
      toast({
        title: "Incorrect",
        description: `The correct answer was: ${catQuizQuestions[currentQuestion].correctAnswer}`,
        variant: "destructive",
      });
    }

    if (currentQuestion < catQuizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizStarted(false);
      toast({
        title: "Quiz Completed!",
        description: `Your score: ${score + (answer === catQuizQuestions[currentQuestion].correctAnswer ? 1 : 0)}/${catQuizQuestions.length}`,
      });
    }
  };

  return (
    <div className={`min-h-screen p-8 transition-colors duration-300 ${themes[theme]}`}>
      <Card className={`max-w-4xl mx-auto ${theme === "dark" ? "bg-gray-800 text-white" : ""}`}>
        <CardHeader>
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <CardTitle className="text-4xl font-bold flex items-center justify-center">
              <Cat className={`mr-2 ${theme === "light" ? "text-purple-600" : "text-purple-400"}`} /> All About Cats
            </CardTitle>
            <CardDescription className={`text-center text-lg ${theme === "dark" ? "text-gray-300" : ""}`}>
              Discover the fascinating world of our feline friends
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
          <Carousel className="mb-6">
            <CarouselContent>
              {catBreeds.map((breed, index) => (
                <CarouselItem key={index}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={breed.image}
                      alt={breed.name}
                      className="mx-auto object-cover w-full h-[400px] rounded-lg shadow-lg"
                    />
                    <div className={`text-center mt-2 ${theme === "dark" ? "text-gray-300" : ""}`}>
                      <p className="font-semibold text-lg">{breed.name}</p>
                      <p className="text-sm">{breed.description}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
          <AnimatePresence mode="wait">
            <motion.p
              key={currentFact}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={`text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-6 text-center italic`}
            >
              "{catFacts[currentFact]}"
            </motion.p>
          </AnimatePresence>
          <Tabs defaultValue="characteristics" className="mb-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="characteristics">Characteristics</TabsTrigger>
              <TabsTrigger value="breeds">Popular Breeds</TabsTrigger>
              <TabsTrigger value="quiz">Cat Quiz</TabsTrigger>
            </TabsList>
            <TabsContent value="characteristics">
              <Card className={theme === "dark" ? "bg-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>Characteristics of Cats</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className={`list-none space-y-2 ${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                    {["Excellent hunters with sharp claws and teeth", "Flexible bodies and quick reflexes", "Keen senses, especially their night vision", "Communicate through vocalizations, body language, and scent"].map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-center"
                      >
                        <Paw className="mr-2 h-5 w-5 text-purple-500" /> {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="breeds">
              <Card className={theme === "dark" ? "bg-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>Popular Cat Breeds</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {catBreeds.map((breed, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start"
                      >
                        <Info className={`mr-2 h-5 w-5 ${theme === "dark" ? "text-blue-400" : "text-blue-500"} mt-1`} />
                        <div className={theme === "dark" ? "text-gray-300" : ""}>
                          <span className="font-semibold">{breed.name}:</span> {breed.description}
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="quiz">
              <Card className={theme === "dark" ? "bg-gray-700" : ""}>
                <CardHeader>
                  <CardTitle className={theme === "dark" ? "text-white" : ""}>Cat Trivia Quiz</CardTitle>
                </CardHeader>
                <CardContent>
                  {!quizStarted ? (
                    <Button onClick={() => setQuizStarted(true)}>Start Quiz</Button>
                  ) : (
                    <div>
                      <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : ""}`}>
                        {catQuizQuestions[currentQuestion].question}
                      </h3>
                      <div className="space-y-2">
                        {catQuizQuestions[currentQuestion].options.map((option, index) => (
                          <Button
                            key={index}
                            onClick={() => handleQuizAnswer(option)}
                            variant="outline"
                            className="w-full text-left justify-start"
                          >
                            {option}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          <p className={`text-xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-6`}>
            Whether you're a cat owner or just an admirer, these furry friends continue to captivate us with their charm and personality.
          </p>
          <div className="flex justify-center space-x-4">
            <Button onClick={handleLike} className="bg-pink-500 hover:bg-pink-600">
              <Heart className="mr-2 h-4 w-4" /> Like This Page
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className={theme === "dark" ? "bg-gray-700 text-white" : ""}>
                  <Palette className="mr-2 h-4 w-4" /> Change Theme
                </Button>
              </DialogTrigger>
              <DialogContent className={theme === "dark" ? "bg-gray-800 text-white" : ""}>
                <DialogHeader>
                  <DialogTitle>Choose a theme</DialogTitle>
                  <DialogDescription>Select a theme for the cat page</DialogDescription>
                </DialogHeader>
                <RadioGroup defaultValue={theme} onValueChange={setTheme}>
                  {Object.keys(themes).map((themeKey) => (
                    <div key={themeKey} className="flex items-center space-x-2">
                      <RadioGroupItem value={themeKey} id={themeKey} />
                      <Label htmlFor={themeKey}>{themeKey.charAt(0).toUpperCase() + themeKey.slice(1)}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 right-8"
          >
            <Button onClick={scrollToTop} className="rounded-full p-3">
              <ChevronUp className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
