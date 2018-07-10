FactoryBot.define do
  factory :announcement do
    body "MyString"
    published true
    publish_at { DateTime.now }
    course
  end
end
