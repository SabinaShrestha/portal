FactoryBot.define do
  factory :attendance do
    present false
    tardy false
    tardy_time "2018-06-26 20:29:10"
    reason "MyText"
    excused false
    absent false
    date "MyString"
    total_attendance 1.5
    badge "MyString"
    enrollment_id 1
  end
end
