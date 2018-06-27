require 'rails_helper'

RSpec.describe Quiz, type: :model do
  
  describe 'attributes' do 
    it 'has a name' do
      name = 'React Quiz'
      quiz = Quiz.create(name: name)
      expect(quiz.name).to eq(name)
    end

    it 'has a quiz type' do
      quiz_type = 'survey'
      quiz = Quiz.create(quiz_type: quiz_type)
      expect(quiz.quiz_type).to eq(quiz_type)
    end

    it 'has points' do
      points = 100.0
      quiz = Quiz.create(points: points)
      expect(quiz.points).to eq(points)
    end

    it 'can have multiple attempts' do
      multiple_attempts = true
      quiz = Quiz.create(multiple_attempts: multiple_attempts)
      expect(quiz.multiple_attempts).to eq(multiple_attempts)
    end

    it 'does not have to have multiple attempts' do
      multiple_attempts = false
      quiz = Quiz.create(multiple_attempts: multiple_attempts)
      expect(quiz.multiple_attempts).to eq(multiple_attempts)
    end
    
    it 'can be shuffled' do
      shuffle = true
      quiz = Quiz.create(shuffle: shuffle)
      expect(quiz.shuffle).to eq(shuffle)
    end

    it 'does not have to be shuffled' do
      shuffle = false
      quiz = Quiz.create(shuffle: shuffle)
      expect(quiz.shuffle).to eq(shuffle)
    end

    it 'can be published' do
      published = true
      quiz = Quiz.create(published: published)
      expect(quiz.published).to eq(published)
    end

    it 'does not have to be published' do
      published = false
      quiz = Quiz.create(published: published)
      expect(quiz.published).to eq(published)
    end
    
  end

  describe 'associations' do
    it { should belong_to(:course) }
    it { should belong_to(:grading_group) }
    it { should have_many(:questions) }
  end

  describe 'validations' do
    it { should validate_presence_of(:name) }
    it { should validate_presence_of(:quiz_type) }
  end

end
