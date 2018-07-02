FactoryBot.define do
  factory :submission do
    enrollment nil
    quiz nil
    assignment nil
    due_date "2018-07-02 14:47:01"
    date_submitted "2018-07-02 14:47:01"
    grade_type true
    sub_type "MyString"
  end
end
