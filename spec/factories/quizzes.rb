FactoryBot.define do 
  factory :quiz, class: Quiz do
    name "Difficult quiz"
    quiz_type "Super hard"
    course
    grading_group
  end 
end