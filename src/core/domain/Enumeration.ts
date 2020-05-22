export abstract class Enumeration
{
  Value: number;
  DisplayName: string;

  constructor(value: number, displayName: string) 
  {
    this.Value = value;
    this.DisplayName = displayName;
  }
}


export class MatchQualityType extends Enumeration
{
  public static Instances: MatchQualityType[] = [];
  public static readonly Unknown = new MatchQualityType(0, 'None, or unknown match', 0, 0);
  public static readonly PoorMatch = new MatchQualityType(1, 'Poor Match', 1, 24);
  public static readonly FairMatch = new MatchQualityType(2, 'Fair Match', 25, 49);
  public static readonly GoodMatch = new MatchQualityType(3, 'Good Match', 50, 74);
  public static readonly GreatMatch = new MatchQualityType(4, 'Great Match', 75, 89);
  public static readonly ExcellentMatch = new MatchQualityType(5, 'Excellent Match', 90, 100);
  public static readonly Overqualified = new MatchQualityType(6, 'Overqualified', 101, 10000);

  private _lowEnd: number;
  private _highEnd: number;

  private constructor
    (
      value: number,
      displayName: string,
      lowEnd: number,
      highEnd: number
    ) 
  {
    super(value, displayName);

    this._lowEnd = lowEnd;
    this._highEnd = highEnd;

    MatchQualityType.Instances.push(this);
  }

  get LowEnd(): number 
  {
    return this._lowEnd;
  }

  get HighEnd(): number 
  {
    return this._highEnd;
  }

  static fromValue(value: number): MatchQualityType
  {
    try
    {
      if (MatchQualityType.Instances)
      {
        const instance = MatchQualityType.Instances.filter((item: Enumeration) => item.Value === value);

        if (instance != null && instance.length === 1)
        {
          return instance[0];
        }
      }

      return MatchQualityType.Unknown;
    }
    catch (error)
    {
      return MatchQualityType.Unknown;
    }
  }

  static fromDisplayName(displayName: string): MatchQualityType
  {
    try
    {
      if (MatchQualityType.Instances)
      {
        const instance = MatchQualityType.Instances.filter((item: Enumeration) => item.DisplayName === displayName);

        if (instance != null && instance.length === 1)
        {
          return instance[0];
        }
      }

      return MatchQualityType.Unknown;
    }
    catch (error)
    {
      return MatchQualityType.Unknown;
    }
  }

  static fromScore(score: number): MatchQualityType
  {
    try
    {
      if (MatchQualityType.Instances)
      {
        const instance = MatchQualityType.Instances.filter((item: MatchQualityType) => score >= item.LowEnd && score <= item.HighEnd);

        if (instance != null && instance.length === 1)
        {
          return instance[0];
        }
      }

      return MatchQualityType.Unknown;
    }
    catch (error)
    {
      return MatchQualityType.Unknown;
    }
  }
}
