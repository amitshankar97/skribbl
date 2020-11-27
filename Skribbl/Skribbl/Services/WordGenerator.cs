namespace Skribbl.Services
{
    using System;
    using System.Collections.Generic;
    using System.Linq;

    public class WordGenerator
    {
        public List<string> words = new List<string>();
        Random random = new Random();

        public WordGenerator()
        {
            words.Add("apple");
            words.Add("orange");
            words.Add("bottle");
            words.Add("laptop");

            // shuffle words after insertion
            words.OrderBy(a => Guid.NewGuid()).ToList();
        }

        public string GetNewWord()
        {
            // Generate random word
            if(words.Count > 0)
            {
                var word = words.ElementAt(0);
                words.RemoveAt(0);
                return word;
            } else
            {
                throw new Exception("Ran out of words");
            }
        }
    }
}
