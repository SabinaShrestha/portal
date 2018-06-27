FactoryBot.define do
  factory :enrollment do
    factory :student do
      role "student"
    end

    factory :teacher do
      role "teacher"
    end

    factory :ta do
      role "ta"
    end

    factory :observer do
      role "observer"
    end
  end
end
