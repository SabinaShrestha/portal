class Question < ApplicationRecord  
  belongs_to :quiz

  validates_presence_of :points, :body

end
