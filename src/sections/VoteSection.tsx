import { useState, useEffect } from 'react'
import { supabase, Vote } from '@/lib/supabase'

const LIBRARIES = [
  { key: 'mui',    label: 'MUI X Date Pickers',   desc: '@mui/x-date-pickers v7',        color: '#1565c0', bg: '#e3f2fd' },
  { key: 'antd',   label: 'Ant Design',            desc: 'antd v5 DatePicker',            color: '#d46b08', bg: '#fff7e6' },
  { key: 'shadcn', label: 'shadcn/ui',             desc: 'react-day-picker + Popover',    color: '#374151', bg: '#f3f4f6' },
  { key: 'rcal',   label: 'react-calendar',        desc: 'v5 + react-time-picker',        color: '#b45309', bg: '#fef3c7' },
  { key: 'aria',   label: 'React Aria',            desc: 'react-aria-components v1',      color: '#9d174d', bg: '#fce7f3' },
]

const VOTED_KEY = 'datepicker-voted'

function VoteBar({ library, count, max, color }: { library: string; count: number; max: number; color: string }) {
  const pct = max === 0 ? 0 : Math.round((count / max) * 100)
  const lib = LIBRARIES.find((l) => l.key === library)
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>{lib?.label ?? library}</span>
        <span style={{ fontSize: 12, color: '#6b7280' }}>{count}표 ({pct}%)</span>
      </div>
      <div style={{ height: 10, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%',
          width: `${pct}%`,
          background: color,
          borderRadius: 99,
          transition: 'width 0.6s ease',
        }} />
      </div>
    </div>
  )
}

export function VoteSection() {
  const [selected, setSelected] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)
  const [votes, setVotes] = useState<Vote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setHasVoted(!!localStorage.getItem(VOTED_KEY))
    fetchVotes()
  }, [])

  async function fetchVotes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('votes')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) setError(error.message)
    else setVotes(data ?? [])
    setLoading(false)
  }

  async function handleSubmit() {
    if (!selected) return
    setSubmitting(true)
    setError(null)
    const { error } = await supabase.from('votes').insert({
      library: selected,
      comment: comment.trim() || null,
    })
    if (error) {
      setError(error.message)
      setSubmitting(false)
      return
    }
    localStorage.setItem(VOTED_KEY, '1')
    setHasVoted(true)
    await fetchVotes()
    setSubmitting(false)
  }

  // 집계
  const counts = LIBRARIES.reduce<Record<string, number>>((acc, l) => {
    acc[l.key] = votes.filter((v) => v.library === l.key).length
    return acc
  }, {})
  const maxCount = Math.max(...Object.values(counts), 1)
  const totalVotes = votes.length
  const comments = votes.filter((v) => v.comment)

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>🗳️ 선호도 투표</h1>
        <p style={{ fontSize: 13, color: '#6b7280' }}>
          모든 비교를 살펴봤다면, 어떤 라이브러리가 가장 마음에 드셨나요?
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'start' }}>

        {/* 왼쪽: 투표 폼 or 완료 메시지 */}
        <div>
          {!hasVoted ? (
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 16 }}>라이브러리 선택</h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20 }}>
                {LIBRARIES.map((lib) => (
                  <button
                    key={lib.key}
                    onClick={() => setSelected(lib.key)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '10px 14px',
                      borderRadius: 8,
                      border: selected === lib.key ? `2px solid ${lib.color}` : '2px solid #e5e7eb',
                      background: selected === lib.key ? lib.bg : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.15s',
                    }}
                  >
                    <div style={{
                      width: 18, height: 18, borderRadius: '50%',
                      border: selected === lib.key ? `5px solid ${lib.color}` : '2px solid #d1d5db',
                      flexShrink: 0,
                      transition: 'all 0.15s',
                    }} />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: selected === lib.key ? lib.color : '#111827' }}>
                        {lib.label}
                      </div>
                      <div style={{ fontSize: 11, color: '#9ca3af', marginTop: 1 }}>{lib.desc}</div>
                    </div>
                  </button>
                ))}
              </div>

              <div style={{ marginBottom: 16 }}>
                <label style={{ fontSize: 13, fontWeight: 500, color: '#374151', display: 'block', marginBottom: 6 }}>
                  의견 남기기 <span style={{ color: '#9ca3af', fontWeight: 400 }}>(선택)</span>
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="선택한 이유나 사용 소감을 자유롭게 남겨주세요..."
                  maxLength={300}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    fontSize: 13,
                    border: '1px solid #d1d5db',
                    borderRadius: 8,
                    resize: 'vertical',
                    outline: 'none',
                    color: '#374151',
                    boxSizing: 'border-box',
                    fontFamily: 'inherit',
                  }}
                />
                <div style={{ fontSize: 11, color: '#9ca3af', textAlign: 'right', marginTop: 2 }}>
                  {comment.length}/300
                </div>
              </div>

              {error && (
                <p style={{ fontSize: 12, color: '#dc2626', marginBottom: 12 }}>오류: {error}</p>
              )}

              <button
                onClick={handleSubmit}
                disabled={!selected || submitting}
                style={{
                  width: '100%',
                  padding: '10px',
                  background: selected ? '#2563eb' : '#e5e7eb',
                  color: selected ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: selected ? 'pointer' : 'not-allowed',
                  transition: 'background 0.15s',
                }}
              >
                {submitting ? '제출 중...' : '투표하기'}
              </button>
            </div>
          ) : (
            <div style={{
              background: '#f0fdf4',
              border: '1px solid #bbf7d0',
              borderRadius: 12,
              padding: 24,
              textAlign: 'center',
            }}>
              <div style={{ fontSize: 32, marginBottom: 8 }}>✅</div>
              <p style={{ fontSize: 14, fontWeight: 600, color: '#166534', marginBottom: 4 }}>투표 완료!</p>
              <p style={{ fontSize: 12, color: '#4ade80' }}>소중한 의견 감사합니다.</p>
            </div>
          )}
        </div>

        {/* 오른쪽: 결과 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: '#111827' }}>📊 투표 결과</h2>
              <span style={{ fontSize: 11, color: '#9ca3af' }}>총 {totalVotes}표</span>
            </div>

            {loading ? (
              <p style={{ fontSize: 13, color: '#9ca3af', textAlign: 'center', padding: '16px 0' }}>불러오는 중...</p>
            ) : (
              LIBRARIES.map((lib) => (
                <VoteBar
                  key={lib.key}
                  library={lib.key}
                  count={counts[lib.key]}
                  max={maxCount}
                  color={lib.color}
                />
              ))
            )}
          </div>

          {/* 최근 의견 */}
          {comments.length > 0 && (
            <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20 }}>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: '#111827', marginBottom: 12 }}>
                💬 최근 의견
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {comments.slice(0, 5).map((v) => {
                  const lib = LIBRARIES.find((l) => l.key === v.library)
                  return (
                    <div key={v.id} style={{
                      padding: '10px 12px',
                      background: lib?.bg ?? '#f9fafb',
                      borderRadius: 8,
                      borderLeft: `3px solid ${lib?.color ?? '#d1d5db'}`,
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: lib?.color ?? '#6b7280', marginBottom: 4 }}>
                        {lib?.label ?? v.library}
                      </div>
                      <p style={{ fontSize: 12, color: '#4b5563', margin: 0, lineHeight: 1.5 }}>
                        {v.comment}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
