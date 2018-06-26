require 'rails_helper'

RSpec.describe UnitItem, type: :model do
  it { should belong_to(:unit) }
end
  